function slugWriter(sentence, join = "") {
    return sentence
        .split(" ")
        .map((w) => w.trim().toLowerCase())
        .filter((w) => w.length > 1)
        .join(join)
}

function fromCMD() {
    let frontMatter = new Map()
    frontMatter.set("title", "")
    frontMatter.set("desc", "")
    frontMatter.set("date", new Date(new Date() + new Date(1000*60*60*5.5)).toISOString())
    frontMatter.set("tags", [])
    const args = process.argv.slice(2)
    for (let i = 0; i < args.length - 1; i += 2) {
        const argK = args[i].slice(2)
        if (!frontMatter.has(argK)) continue
        if (argK === "tags") {
            frontMatter.set(
                argK,
                args[i + 1].split(",").map((x) => slugWriter(x, ""))
            )
            continue
        }
        frontMatter.set(argK, args[i + 1])
    }
    return frontMatter
}

const frontMatter = fromCMD()

const fs = require("node:fs")

let tags = ""

for (let tag of frontMatter.get("tags")) {
    tags += `- ${tag}`
    if (tag !== frontMatter.get("tags").at(-1)) tags += `\n\t\t`
}

fs.writeFileSync(
    `contents/posts/${slugWriter(frontMatter.get("title"), "-")}.liquid`,
    `---
    layout: 'post.liquid'
    title: ${frontMatter.get("title")}
    desc: ${frontMatter.get("desc")}
    date: ${frontMatter.get("date")}
    tags: [post,${frontMatter.get("tags").join(", ")}]
---

<article>
\t
</article>
`
)
