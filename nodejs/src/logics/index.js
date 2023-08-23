const BORDER_WIDTH = 1

export function createForest(data) {
    return data.replaceAll("\n", "  ")
        .trim()
        .split("  ")
        .map((xs) => 
            xs.split("")
            .map(x => parseInt(x))
        )
}

export function countBorderTree(forest) {
    const [width, length] = getForestDimension(forest)

    return (width * 2) + ((length - 2) * 2)
}

export function countVisibleTree(forest) {
    const inverseForest = createInverseForest(forest)
    const [width, length] = getForestDimension(forest)
    const offsetX = BORDER_WIDTH
    const offsetY = BORDER_WIDTH

    let visibleTreeCount = 0

    for (let x = offsetX; x < width - BORDER_WIDTH; x += 1) {
    
        for (let y = offsetY; y < length - BORDER_WIDTH; y += 1) {
    
            const currentTree = forest[x][y]
            const upwardTrees = inverseForest[y].slice(0, x)
            const downwardTrees = inverseForest[y].slice(x + 1, width)
            const leftTrees = forest[x].slice(0, y)
            const rightTrees = forest[x].slice(y + 1, length)
    
            const highestUpward = Math.max(...upwardTrees)
            const highestDownward = Math.max(...downwardTrees)
            const highestLeft = Math.max(...leftTrees)
            const highestRight = Math.max(...rightTrees)
    
            const surroundTrees = [
                highestUpward,
                highestDownward,
                highestLeft,
                highestRight
            ]
    
            if (isTreeVisible(currentTree, surroundTrees)) {
                visibleTreeCount += 1
            }
        }
    }

    return visibleTreeCount
}

function isTreeVisible(currentTreeHeight, surroundedTrees) {
    return surroundedTrees.some(height => height < currentTreeHeight)
}

function getForestDimension(forest) {
    return [forest.length, forest[0].length]
}

function createInverseForest(forest) {
    const inverseForest = []
    
    forest.forEach(treeRow => {
        treeRow.forEach((tree, index) => {
            if (!inverseForest[index]) {
                inverseForest[index] = []
            }
            inverseForest[index].push(tree)
        })
    })
    
    return inverseForest 
}
