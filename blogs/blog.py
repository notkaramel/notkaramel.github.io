import os
import re
import argparse
from datetime import datetime
from InquirerPy import inquirer

MD_DIR = "."


def slugify(title):
    return re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')


def create_new_blog():
    title = inquirer.text(message="Enter blog title:").execute()
    slug = slugify(title)
    date = datetime.now().strftime("%Y-%m-%d")
    filename = f"{slug}.md"
    filepath = os.path.join(MD_DIR, filename)

    if os.path.exists(filepath):
        print(f"[!] File '{filename}' already exists.")
        return

    frontmatter = (
        "---\n"
        f'title: "{title}"\n'
        f'slug: "{slug}"\n'
        f'timeWritten: "{date}"\n'
        f'lastUpdated: "{date}"\n'
        "tags: []\n"
        "---\n"
    )

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(frontmatter)

    print(f"[+] Created new blog: {filename}")


def update_last_updated():
    files = [f for f in os.listdir(MD_DIR) if f.endswith(".md")]
    if not files:
        print("No markdown files found.")
        return

    filename = inquirer.select(
        message="Select markdown file:", choices=files
    ).execute()
    filepath = os.path.join(MD_DIR, filename)
    date = datetime.now().strftime("%Y-%m-%d")

    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    updated = False
    for i, line in enumerate(lines):
        if line.startswith("lastUpdated:"):
            lines[i] = f'lastUpdated: "{date}"\n'
            updated = True
            break

    if not updated:
        for i, line in enumerate(lines):
            if line.strip() == "---":
                lines.insert(i + 1, f'lastUpdated: "{date}"\n')
                break

    with open(filepath, "w", encoding="utf-8") as f:
        f.writelines(lines)

    print(f"[✓] Updated 'lastUpdated' in {filename}")


def check_frontmatter():
    files = [f for f in os.listdir(MD_DIR) if f.endswith(".md")]
    missing = []

    for file in files:
        with open(os.path.join(MD_DIR, file), "r", encoding="utf-8") as f:
            first_line = f.readline().strip()
            if first_line != "---":
                missing.append(file)

    if missing:
        print("[!] Files missing frontmatter:")
        for file in missing:
            print(f"  - {file}")
    else:
        print("🎉 All markdown files have frontmatter.")


def add_frontmatter():
    files = [f for f in os.listdir(MD_DIR) if f.endswith(".md")]
    no_front = []

    for file in files:
        with open(os.path.join(MD_DIR, file), "r", encoding="utf-8") as f:
            first_line = f.readline().strip()
            if first_line != "---":
                no_front.append(file)

    if not no_front:
        print("All files already have frontmatter.")
        return

    filename = inquirer.select(
        message="Select file to add frontmatter:", choices=no_front
    ).execute()
    title = inquirer.text(message="Enter blog title:").execute()
    slug = slugify(title)
    date = datetime.now().strftime("%Y-%m-%d")

    frontmatter = (
        "---\n"
        f'title: "{title}"\n'
        f'slug: "{slug}"\n'
        f'timeWritten: "{date}"\n'
        f'lastUpdated: "{date}"\n'
        "tags: []\n"
        "---\n"
    )

    filepath = os.path.join(MD_DIR, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(frontmatter + content)

    print(f"[+] Frontmatter added to {filename}")


def main():
    parser = argparse.ArgumentParser(description="Markdown Blog CLI")
    subparsers = parser.add_subparsers(dest="command")

    subparsers.add_parser("new", help="Create a new blog post")
    subparsers.add_parser("updateTime", help="Update 'lastUpdated' in a file")
    subparsers.add_parser("check", help="Check files for missing frontmatter")
    subparsers.add_parser("addFrontmatter", help="Add frontmatter to a file")

    args = parser.parse_args()

    if args.command == "new":
        create_new_blog()
    elif args.command == "updateTime":
        update_last_updated()
    elif args.command == "check":
        check_frontmatter()
    elif args.command == "addFrontmatter":
        add_frontmatter()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
