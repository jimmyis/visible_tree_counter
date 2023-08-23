import { readDataFile } from "./libs/file.js"
import {
    createForest,
    countBorderTree,
    countVisibleTree
} from "./logics/index.js"

const dataFilePath = process.env.npm_config_data

function main() {
    readDataFile(dataFilePath)
    .then(data => {
        const forest = createForest(data)
        const borderCount = countBorderTree(forest)
        const visibleCount = countVisibleTree(forest)

        console.log(borderCount + visibleCount)

    })
    .catch(e => console.error(e))
}

main()
