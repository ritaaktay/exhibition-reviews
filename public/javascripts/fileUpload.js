FilePond.parse(document.body)
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileEncode,
    FilePondPluginImageResize
)
FilePond.setOptions({
    allowMultiple: true,
    maxFiles : 10,
    imagePreviewMaxHeight: 400,
    imageResizeTargetHeight: 150,
})
document.querySelectorAll(".filepond").forEach(pond => {
    FilePond.create(pond)
})

// function saveImages(filepond) {
//     if (filepond == null) return
//     const images = []
//     if (typeof filepond == 'string') {
//         parsed = JSON.parse(filepond)
//             if (parsed != null) images.push({
//                 data: new Buffer.from(parsed.data, 'base64'),
//                 type: parsed.type
//             })
//     } else {
//         filepond.forEach(image => {
//              parsed = JSON.parse(image)
//             if (parsed != null) images.push({
//                 data: new Buffer.from(parsed.data, 'base64'),
//                 type: parsed.type
//             })
//         })
//     }
//     return images 
// }

// module.exports = saveImages

