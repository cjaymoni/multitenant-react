import * as Yup from "yup";

function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}

export function jsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;

export const AssSchema = Yup.object().shape({
  code: Yup.string().required("Asset code required"),
  make: Yup.string().required("Asset Make required"),
  title: Yup.string()
    .matches(alpha, { message: "Enter Valid Name", excludeEmptyString: true })
    .required("Asset Name required")
    .min(2)
    .max(35),
  model: Yup.string().required("Model required"),
  price: Yup.number()
    .positive("Number must be more than 0")
    .integer()
    .required("Price required"),
  lifespan: Yup.number()
    .positive("Lifespan must be more than 0")
    .integer()
    .required("Lifespan is required"),
  serial_number: Yup.string().required("Serial number required"),

  dep_factor: Yup.number()
    .positive("Depreciation factor must be more than 0")
    .integer()
    .required("Depreciation factor is required"),
  description: Yup.string("Enter Asset Description"),
  salvage_price: Yup.string().required("Salvage amount required"),
  service_date: Yup.string().required("Service date required"),
  purchase_date: Yup.string().required("Purchase date required"),
  warranty_deadline: Yup.string().required("Warranty Deadline required"),
  purchase_order_number: Yup.string().required(
    "Purchase Order Number required"
  ),
  depreciation_algorithm: Yup.mixed().required("Depreciation type required"),
  category_ids: Yup.mixed().required("Category required"),
  currency_id: Yup.mixed().required("Currency required"),
  vendor_id: Yup.mixed(),
  inventory_id: Yup.mixed(),
});

export const AsseSchema = Yup.object().shape({
  title: Yup.string()
    .matches(alpha, { message: "Enter Valid Name", excludeEmptyString: true })
    .required("Asset Name required")
    .min(2)
    .max(35),
  code: Yup.string().required("Asset code required"),
  serial_number: Yup.string().required("Serial number required"),
  model: Yup.string().required("Model required"),
  make: Yup.string().required("Asset Make required"),

  amount: Yup.number()
    .positive("Number must be more than 0")
    .integer()
    .required("Price required"),
  purchase_date: Yup.string().required("Purchase date required"),
  warranty_deadline: Yup.string().required("Warranty Deadline required"),
  service_date: Yup.string().required("Service date required"),

  lifespan: Yup.number()
    .positive("Lifespan must be more than 0")
    .integer()
    .required("Lifespan is required"),
  inventory_id: Yup.mixed(),
  department_id: Yup.mixed(),
  salvage_amount: Yup.string().required("Salvage amount required"),
  depreciation_algorithm: Yup.mixed().required("Depreciation type required"),

  dep_factor: Yup.number()
    .positive("Depreciation factor must be more than 0")
    .integer()
    .required("Depreciation factor is required"),
  category_ids: Yup.mixed().required("Category required"),
  vendor: Yup.mixed(),

  description: Yup.string("Enter Inventory Description"),
  // available: Yup.string(),
  // numerable: Yup.mixed().required('Field required'),
  // quantity: Yup.number().positive('Quantity must be more than 1').integer(),
  // returnable: Yup.mixed().required('Returnability required'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be 4 characters at minimum")
    .required("Password is required"),
});

export const ResetSchema = Yup.object().shape({
  code: Yup.string().required("Enter verification code"),
  password: Yup.string()
    .min(4, "Password must be 4 characters at minimum")
    .required("Password is required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const InventorySchema = Yup.object().shape({
  title: Yup.string().required("Enter Inventory Name"),
  manager_id: Yup.mixed().required("Select Inventory Manager"),
  department_id: Yup.mixed(),
  description: Yup.string(),
});

export const AssetSchema = Yup.object().shape({
  // images:Yup.array().required("Image is required"),
  make: Yup.string().required("Asset Make required"),
  code: Yup.string().required("Asset code required"),
  title: Yup.string().required("Asset Name required"),
  model: Yup.string().required("Model required"),
  amount: Yup.number()
    .positive("Number must be more than 0")
    .integer()
    .required("Price required"),
  vendor_id: Yup.mixed(),
  inventory_id: Yup.mixed().required("Inventory required"),
  department_id: Yup.mixed(),
  lifespan: Yup.number()
    .positive("Lifespan must be more than 0")
    .integer()
    .required("Lifespan is required"),
  dep_factor: Yup.number()
    .positive("Depreciation factor must be more than 0")
    .integer()
    .required("Depreciation factor is required"),
  description: Yup.string("Enter Inventory Description"),
  serial_number: Yup.string().required("Serial number required"),
  salvage_amount: Yup.string().required("Salvage amount required"),
  available: Yup.string(),
  category_ids: Yup.mixed().required("Category required"),
  service_date: Yup.string().required("Service date required"),
  purchase_date: Yup.string().required("Purchase date required"),
  warranty_deadline: Yup.string().required("Warranty Deadline required"),
  depreciation_algorithm: Yup.mixed().required("Depreciation type required"),
  numerable: Yup.mixed().required("Field required"),
  quantity: Yup.number().positive("Quantity must be more than 1").integer(),
  returnable: Yup.mixed().required("Returnability required"),
  // condition: Yup.string().required("Provide condition of asset")
});

export const CategorySchema = Yup.object().shape({
  title: Yup.string().required("Provide category name"),
  description: Yup.string().required("Provide category description"),
});

export const RequestSchema = Yup.object().shape({
  priority_id: Yup.mixed().required(" Priority is required"),
  start_date: Yup.string().required("Start Date required"),
  end_date: Yup.string(),

  // quantity:Yup.number().required("Specify number of units").positive().integer(),
});

export const DepartmentSchema = Yup.object().shape({
  title: Yup.string().required("Name is required"),
  description: Yup.string(),
  head_of_department_id: Yup.mixed().required("Select Department Head"),
});

export const RecommendationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  justification: Yup.string().required("Justification is required"),
  description: Yup.string().required("Description is required"),
  priority_id: Yup.mixed().required(" Priority is required"),
});

export const VendorSchema = Yup.object().shape({
  title: Yup.string().required("Vendor name is required"),
  contact: Yup.string(),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  url: Yup.string().url("Invalid website url"),
  description: Yup.string(),
});

export const ConsumableSchema = Yup.object().shape({
  title: Yup.string().required("Item name is required"),
  inventory_id: Yup.mixed().required("Inventory is required"),

  quantity: Yup.number().required("Quantity is required"),
  description: Yup.string(),
  unit_price: Yup.number(),
});

export const LocationSchema = Yup.object().shape({
  title: Yup.string().required("Branches name is required"),
  // city_id: Yup.mixed().required(" City is required"),
  digital_address: Yup.string(),
  phone: Yup.string(),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  description: Yup.string(),
  postal_address: Yup.string(),
  street_address: Yup.string(),
  url: Yup.string().url(),
});

export const ManufacturerSchema = Yup.object().shape({
  title: Yup.string().required("Manufacturer name is required"),
  contact: Yup.string(),
  email: Yup.string().email("Invalid email address format"),

  description: Yup.string(),
  website: Yup.string().url(),
});

export const UserSchema = Yup.object().shape({
  role_id: Yup.mixed().required(" Role is required"),
  password: Yup.string().required("Status is required"),
  last_name: Yup.string().required("Last name is required"),
  first_name: Yup.string().required("First name is required"),
  middle_name: Yup.string(),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  phone: Yup.string(),
});

export const TenantSchema = Yup.object().shape({
  title: Yup.string().required("Provide tenant name"),
  sub_domain_id: Yup.string().required("Provide tenant sub-domain"),

  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  phone: Yup.string(),
  metatitle: Yup.string(),
  street_address: Yup.string(),
  postal_address: Yup.string(),
  digital_address: Yup.string(),
  logo: Yup.string(),
  bg_image: Yup.string(),
  description: Yup.string("Provide tenant description"),
});
