const options = {
  config: {
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
  },
  style: {
    width: "100%",
    height: "60vh",
  },
};

export const marker = (text) => {
  return {
    label: {
      text: text,
      color: "black",
    },
  };
};

export default options;
