const showLoading = () => {
  const element = document.getElementById("overlay_spinner");
  element.style.display = "flex";
};

const hideLoading = () => {
  const element = document.getElementById("overlay_spinner");
  element.style.display = "none";
};

export { showLoading, hideLoading };
