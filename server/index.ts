import figlet from "figlet";
console.log(figlet.textSync("notkaramel!"));

console.log(Bun.file("/src/lib/blogs/*.md"));
let blogs = Bun.file("/src/lib/blogs/*.md");
console.log(blogs.text());


// console.log(Bun.file("./testblog.md"));


const server = Bun.serve({
  port: 3000,
  fetch(req: Request) {
    console.log(req);

    const body = figlet.textSync("Bun!");
    return new Response(body);
  },
});
