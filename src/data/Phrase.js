export default class Phrase
{
  constructor(shortText, fullText, parentFolderId = -1) {
    this.shortText = shortText
    this.fullText = fullText
    this.parentFolderId = parentFolderId
  }
}
