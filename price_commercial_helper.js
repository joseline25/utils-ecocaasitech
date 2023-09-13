import trashs from "../../assets/ecocaasitech.trash.json" assert { type: "json" };

// for commercial
// base price = 500 for commercial
// add tricycle:100 to sizes

// the packages of ecocaasitech
const packages = ["pickup", "cleanup & pickup", "custom"];
// the sizes of trash
const sizes = { bucket: 10, trashbag: 27, wheelbarrow: 80, tricycle: 100 };

// the categories of trash and the increase percentage associated

const categories = { general: 5, recyclable: 7, dangerous: 10 };

// calcute the volume using the estimated volume and the quantity
// estimated_volume = bucket or trashbag or wheelbarrow or tricycle

function calculateVolume(estimated_volume, trash_quantity) {
  return (sizes[estimated_volume] / 1000) * trash_quantity;
}

// Estimate the price using the volume and the category service

function calculateCommercialPrice(volume, category_service) {
  let price = volume * 50000;
  switch (category_service) {
    case "cleanup & pickup":
      price *= 1.2;
      break;

    case "custom":
      price *= 1.5;
      break;

    default:
      price = price;
      break;
  }
  return price;
}

// final estimation : volume + category_service + waste_type

function priceEstimation(
  estimated_volume,
  trash_quantity,
  category_service,
  waste_type
) {
  // calculate the volume
  let volume = calculateVolume(estimated_volume, trash_quantity);

  // calculate the intermediate price before adding the percentage of the category
  let intermediatePrice = calculateCommercialPrice(volume, category_service);

  // calculate the final price based on the category
  let price = intermediatePrice*(1 + categories[waste_type] / 100);

  return price;
}
