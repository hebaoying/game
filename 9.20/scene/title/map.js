class TDMap{
    constructor(game, width, height) {
        this.game = game
        this.w = width
        this.h = height
        this.towerSize = 64
        this.setup()
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    setup() {
        // 5 x 8
        let grid = [
            [0, 0, 1, 0, 0,],
            [1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1,],
            [0, 0, 1, 0, 0,],
        ]
        this.grid = grid
    }
    addTower(i, j) {
        // 0 不能走
        // 1 可以走
        // 10 表示 tower
        this.grid[i][j] = 0
    }
    normalGrid() {
        let grid = []
        for (let column of this.grid) {
            let newColumn = []
            for (let flag of column) {
                if (flag !== 1) {
                    newColumn.push(0)
                } else {
                    newColumn.push(1)
                }
            }
            grid.push(newColumn)
        }
        log('grid:', grid)
        return grid
    }
    pathFinding(i, j) {
        if (i < 0) {
            i = 0
        }
        log('find path', i, j)
        let map = this.normalGrid()
        let graph = new Graph(map)
        let start = graph.grid[i][j]
        let end = graph.grid[7][2]
        let result = astar.search(graph, start, end)
        // log('path finding', result)
        return result
    }
}
