const jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')
const createFolderIsNotExist = require('../helpers/create-folder')

class UploadAvatarService {
  constructor(folderAvatars) {
    this.folderAvatars = folderAvatars
  }

  async transformAvatar(pathFile) {
    const picture = await jimp.read(pathFile)
    await picture
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile)
  }

  async saveAvatar({ idUser, file }) {
    const { path: filePath, filename } = file
    await this.transformAvatar(filePath)
    const folderUserAvatar = path.join(this.folderAvatars, idUser)
    console.log(typeof folderUserAvatar)
    await createFolderIsNotExist(folderUserAvatar)
    await fs.rename(filePath, path.join(folderUserAvatar, filename))
    return path.normalize(path.join(idUser, filename))
  }
}

module.exports = UploadAvatarService
