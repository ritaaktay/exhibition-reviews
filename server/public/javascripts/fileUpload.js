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