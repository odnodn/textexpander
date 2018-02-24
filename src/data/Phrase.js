export default class Phrase
{
  constructor(id, shortText, fullText, folderId = -1) {
    this.id = id
    this.shortText = shortText
    this.fullText = fullText
    this.folderId = folderId
  }

  static create(shortText, fullText, folderId) {
    let phrase = new Phrase(-1, shortText, fullText, folderId)
    return phrase
  }
}
