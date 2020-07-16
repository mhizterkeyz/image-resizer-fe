let inputs = {
  resizeWidth: 0,
  resizeHeight: 0,
  cropWidth: 0,
  cropHeight: 0,
  top: 0,
  left: 0,
  angle: 0,
  url: "",
};

//  handlers
const handleInputs = (ev) => {
  const { name, value } = ev.target;
  inputs = { ...inputs, [name]: value };
};

const handleResize = async () => {
  const query = `/resize?height=${inputs.resizeHeight}&&width=${inputs.resizeWidth}&&url=${inputs.url}`;
  apiCall(query, "resized");
};

const handleCrop = () => {
  const query = `/crop?height=${inputs.cropHeight}&&width=${inputs.cropWidth}&&top=${inputs.top}&&left=${inputs.left}&&url=${inputs.url}`;
  apiCall(query, "cropped");
};

const handleRotate = () => {
  const query = `/rotate?url=${inputs.url}&&angle=${inputs.angle}`;
  apiCall(query, "rotated");
};

//  Attaching Event Hanglers
document
  .querySelectorAll("input")
  .forEach((elem) => $(elem).on("input", handleInputs));

$(".resize-btn").click(handleResize);
$(".crop-btn").click(handleCrop);
$(".rotate-btn").click(handleRotate);
