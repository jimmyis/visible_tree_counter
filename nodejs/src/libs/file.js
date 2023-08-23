import fs from "fs"

export async function readDataFile(filePath) {
    return new Promise((resolve, reject) => 
        fs.readFile(`${filePath}`, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                return reject(err)
            }

            resolve(data)
        })
    )
}
