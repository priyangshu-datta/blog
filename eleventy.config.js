const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")

module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter("getAllTags", function (collection) {
        let tags = new Set()

        for (let item of collection) {
            ;(item.data.tags ?? []).forEach((tag) => tags.add(tag))
        }
        tags.delete("post")
        return Array.from(tags)
    })

    eleventyConfig.addFilter("tagSortByMaxPosts", function (collection) {
        let tags = new Map()

        for (let item of collection) {
            ;(item.data.tags ?? []).forEach((tag) =>
                tags.set(tag, (tags.get(tag) ?? 0) + 1)
            )
        }
        tags.delete("post")

        tags = new Map([...tags.entries()].sort((a, b) => b[1] - a[1]))

        return Array.from(tags.keys())
    })

    eleventyConfig.addFilter("getTags", function (tags) {
        return tags.filter((tag) => !tag.includes("post"))
    })

    eleventyConfig.addPlugin(eleventyNavigationPlugin)

    return {
        dir: {
            input: "contents",
        },
    }
}
