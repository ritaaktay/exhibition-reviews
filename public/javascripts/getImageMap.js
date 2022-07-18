function getImageMap(exhibitions) {
    let imageMap = {}
    for (let exhibition of exhibitions) {
        for (let review of exhibition.review_ids) {
            if (review.images.length == 0) continue
            else {
                imageMap[exhibition.id] = review.decodedImages[0]
                break
            }
        }
    }
    return imageMap
}

module.exports = getImageMap