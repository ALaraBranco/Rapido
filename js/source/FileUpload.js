const FileUpload = {
    setValueToFakeInput: function (realInput) {
        let fakeInput = realInput.parentElement.querySelector(".js-fake-input");
        let noFilesText = realInput.getAttribute("data-no-files-text");
        let manyFilesText = realInput.getAttribute("data-many-files-text");
        if (realInput.files.length == 0) {
            fakeInput.innerText = noFilesText;
        } else if (realInput.files.length <= 3) {
            fakeInput.innerText = [].slice.call(realInput.files).map(function (file) {
                return file.name;
            }).join(", ");
        } else {
            fakeInput.innerText = realInput.files.length + " " + manyFilesText;
        }
    }
}