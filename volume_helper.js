const volumeCalculator = (category, quantity) => {
  const sizes = { "Bucket": 10, "Trashbag": 27, "Wheelbarrow": 80 };
  let volume = (sizes[category] / 1000) * quantity;
  volume = Number(volume);
  return volume;
}

module.exports = volumeCalculator;