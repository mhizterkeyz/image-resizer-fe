const navigation = () => {
  const locationHash = window.location.hash || "#resize";
  $(".active").removeClass("active");
  $(locationHash).addClass("active");
  if (locationHash === "#crop") {
    $(".crop").addClass("active");
  } else if (locationHash === "#rotate") {
    $(".rotate").addClass("active");
  } else {
    $(".resize").addClass("active");
  }
};
window.onhashchange = navigation;
navigation();

const apiErrorHandler = (req, res) => {
  if (req.status >= 400) {
    const e = new Error(res.message);
    throw e;
  }
};

const apiUrl = "https://hngi-image.herokuapp.com/v1";

const app = {
  h: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage["jwt"] || ""}`,
  },
  headers: (obj) => {
    app.h = { ...app.h, ...obj };
    return app;
  },
  b: JSON.stringify({}),
  body: (obj) => {
    app.b = JSON.stringify(obj);
    return app;
  },
  gimme_body: () => {
    const body = app.b;
    app.b = JSON.stringify({});
    return body;
  },
  post: (url) => {
    return fetch(url, {
      method: "post",
      body: app.gimme_body(),
      headers: app.h,
    });
  },
  get: (url) => {
    return fetch(url, { method: "get", headers: app.h });
  },
  put: (url) => {
    return fetch(url, {
      method: "put",
      body: app.gimme_body(),
      headers: app.h,
    });
  },
  delete: (url) => {
    return fetch(url, {
      method: "delete",
      body: app.gimme_body(),
      headers: app.h,
    });
  },
};

const api = app;

const apiCall = async (query, message) => {
  try {
    const req = await api.post(apiUrl + query);
    const res = await req.json();

    apiErrorHandler(req, res);

    $(".result-img").attr("src", "https://" + res.url);
    toast.success(
      "Image " + message + " successfully. Right click on image to download",
      5000
    );
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      return toast.error("It appears you're offline");
    }
    toast.error(error.message);
  }
};
