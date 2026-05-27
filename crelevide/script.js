import { processImage } from "./processImage.js"

const fileInput = document.getElementById("FilePicker")
const xsize = document.getElementById("xsize")
const ysize = document.getElementById("ysize")
const animate = document.getElementById("animate")
const button = document.getElementById("Convert")

const preview = document.getElementById("preview")
const imagePreview = document.getElementById("previewImage")
const videoPreview = document.getElementById("previewVideo")

const code = document.getElementById("code")
const copy = document.getElementById("copy")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


const validateForm = () => {
	if (!xsize.value || !ysize.value) {
		console.log("You need dimensions to convert")
		return false
	}

	if (!imagePreview.src && !videoPreview.src) {
		console.log("You must upload a valid media type first!")
		return false
	}

	const media = imagePreview.style.display == "block" ? imagePreview : videoPreview

	canvas.width=xsize.value
	canvas.height=ysize.value

	ctx.drawImage(media, 0, 0, canvas.width, canvas.height)

	return true
}

fileInput.onchange = () => {
	const file = fileInput.files[0];

	imagePreview.src = ""
	videoPreview.src = ""
	imagePreview.style.display = "none"
	videoPreview.style.display = "none"
	preview.style.display = "none"

	if (!(file.type.startsWith("image") || file.type.startsWith("video"))) {
		console.log(`Invalid file type of ${file.type}`)
		return
	}

	const reader = new FileReader();
	reader.readAsDataURL(file)
	reader.onload = () => {
		if (file.type.startsWith("image")) {
			imagePreview.src = reader.result
			imagePreview.style.display = "block"
			preview.style.display = "inline-block"
		} else {
			videoPreview.src = reader.result
			videoPreview.style.display = "block"
			preview.style.display = "inline-block"
		}
	}
}

button.onclick = () => {
	const isValid = validateForm()
	if (!isValid) {
		alert("Invalid form! Ensure all details entered are valid.")
		return
	}

	const res = processImage(canvas, ctx)

	code.innerHTML = res
}

copy.onclick = () => {
	const text = code.innerHTML;

	navigator.clipboard.writeText(text).then(() => {
		alert("Copied to clipboard!");
	});
}



