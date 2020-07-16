const toast = {
  dialogue: {
    showSuccess: (message) => {
      $(".toast").addClass("show success").removeClass("hide error");
      $(".toast p").text(message);
      return toast.dialogue;
    },
    showError: (message) => {
      $(".toast").addClass("show error").removeClass("hide success");
      $(".toast p").text(message);
      return toast.dialogue;
    },
    hide: () => {
      toast.isDisplaying = false;
      $(".toast").removeClass("show").addClass("hide");
      setTimeout(() => {
        if (toast.stack.length) {
          const data = toast.stack.splice(0, 1)[0];
          if (data.type) toast.success(data.message, data.timeout);
          else toast.error(data.message, data.timeout);
        }
      }, 1800);
      return toast.dialogue;
    },
  },
  stack: [],
  isDisplaying: false,
  success: (message, timeout = 3000) => {
    if (toast.isDisplaying) {
      toast.stack.push({ message, type: true, timeout });
      return;
    }
    toast.isDisplaying = true;
    toast.dialogue.showSuccess(message);
    setTimeout(toast.dialogue.hide, timeout);
  },
  error: (message, timeout = 3000) => {
    if (toast.isDisplaying) {
      toast.stack.push({ message, type: false, timeout });
      return;
    }
    toast.isDisplaying = true;
    toast.dialogue.showError(message);
    setTimeout(toast.dialogue.hide, timeout);
  },
};
