# Courtesy of ChatGPT.
# I will manually fix some of these commands one day :)
# Available commands:
# * `make new`: Create new blog
# * `make updateTime`: Update "lastUpdated" on frontmatter, assuming front matter exited
# * `make addFrontmatter`: Add Frontmatter with interactive title input
# * `make check`: Check for frontmatter existing in files

new:
	{ \
		read -p "Enter blog title: " TITLE; \
		SLUG=$$(echo "$$TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g' | sed -E 's/^-+|-+$$//g'); \
		DATETIME=$$(date +"%Y-%m-%d"); \
		FILENAME="$$SLUG.md"; \
		echo "Creating new blog post: $$FILENAME"; \
		printf "%s\n" "---" \
			"title: \"$$TITLE\"" \
			"slug: \"$$SLUG\"" \
			"timeWritten: \"$$DATETIME\"" \
			"lastUpdated: \"$$DATETIME\"" \
			"---" > "$$FILENAME"; \
	}

updateTime:
	@FILE=$$(find . -maxdepth 1 -name "*.md" | fzf --prompt="Select markdown file > "); \
	if [ -z "$$FILE" ]; then \
		echo "No file selected."; exit 1; \
	fi; \
	DATE=$$(date +"%Y-%m-%d"); \
	if grep -q '^lastUpdated:' "$$FILE"; then \
		sed -i -E "s/^(lastUpdated: ).*/\1\"$$DATE\"/" "$$FILE"; \
		echo "Updated existing 'lastUpdated' in $$FILE to $$DATE"; \
	else \
		sed -i "0,/^---$$/ {/^---$$/a lastUpdated: \"$$DATE\"}" "$$FILE"; \
		echo "Inserted new 'lastUpdated' in $$FILE as $$DATE"; \
	fi

addFrontmatter:
	@FILES=(); \
	for FILE in *.md; do \
		if [ ! -f "$$FILE" ]; then continue; fi; \
		FIRST_LINE=$$(head -n 1 "$$FILE"); \
		if [ "$$FIRST_LINE" != "---" ]; then \
			FILES+=("$$FILE"); \
		fi; \
	done; \
	if [ $${#FILES[@]} -eq 0 ]; then \
		echo "✅ All markdown files already have frontmatter."; \
		exit 0; \
	fi; \
	echo "Select a file to add frontmatter:"; \
	select FILE in "$${FILES[@]}"; do \
		if [ -n "$$FILE" ]; then break; fi; \
		echo "Invalid choice. Try again."; \
	done; \
	read -p "Enter blog title ($$FILE): " TITLE; \
	SLUG=$$(echo "$$TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g' | sed -E 's/^-+|-+$$//g'); \
	DATETIME=$$(date +"%Y-%m-%d"); \
	FRONTMATTER=$$(printf -- "---\ntitle: \"%s\"\nslug: \"%s\"\ntimeWritten: \"%s\"\nlastUpdated: \"%s\"\n---\n\n" "$$TITLE" "$$SLUG" "$$DATETIME" "$$DATETIME"); \
	TMPFILE=$$(mktemp); \
	echo "$$FRONTMATTER" > "$$TMPFILE"; \
	cat "$$FILE" >> "$$TMPFILE"; \
	mv "$$TMPFILE" "$$FILE"; \
	echo "✅ Frontmatter added to $$FILE"

check:
	@echo "Checking for markdown files missing frontmatter..."; \
	MISSING=0; \
	for FILE in *.md; do \
		if [ ! -f "$$FILE" ]; then continue; fi; \
		if ! head -n 1 "$$FILE" | grep -q '^---$$'; then \
			echo "* Missing frontmatter: $$FILE"; \
			MISSING=1; \
		fi; \
	done; \
	if [ "$$MISSING" -eq 0 ]; then \
		echo ":hooray: All markdown files have frontmatter."; \
	fi
