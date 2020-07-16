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

const liveUseUrl =
  window.location.protocol +
  "//" +
  window.location.host +
  "/image-resizer-fe/assets/";
console.log(liveUseUrl);

//  Resized examples
[
  "sample.jpg",
  "sample1.jpg",
  "sample2.jpg",
  "sample3.jpg",
  "sample4.jpg",
].forEach(async (img, i) => {
  try {
    const query = `/resize?height=100&&width=100&&url=${liveUseUrl + img}`;
    const url = await apiCall(query, "rotated", true);
    $(".resized-sample")
      .eq(i)
      .attr("src", "https://" + url);
  } catch (error) {
    //  sample failed. do nothing
  }
});

//  Cropped examples
[
  "sample.jpg",
  "sample1.jpg",
  "sample2.jpg",
  "sample3.jpg",
  "sample4.jpg",
].forEach(async (img, i) => {
  try {
    const query = `/crop?height=100&&width=100&&top=50&&left=50&&url=${
      liveUseUrl + img
    }`;
    const url = await apiCall(query, "cropped", true);
    $(".cropped-sample")
      .eq(i)
      .attr("src", "https://" + url);
  } catch (error) {
    toast.error(error.message);
    //  sample failed. do nothing
  }
});

//  Rotated examples
[
  "sample.jpg",
  "sample1.jpg",
  "sample2.jpg",
  "sample3.jpg",
  "sample4.jpg",
].forEach(async (img, i) => {
  try {
    const query = `/rotate?angle=45&&url=${liveUseUrl + img}`;
    const url = await apiCall(query, "rotated", true);
    $(".rotated-sample")
      .eq(i)
      .attr("src", "https://" + url);
  } catch (error) {
    toast.error(error.message);
    //  sample failed. do nothing
  }
});
