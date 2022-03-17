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
  title: Yup.string()
    .matches(alpha, { message: "Enter Valid Name", excludeEmptyString: true })
    .required("Asset Name required")
    .max(35),
  code: Yup.string().required("Asset code required"),
  serial_number: Yup.string().required("Serial number required"),
  model: Yup.string().required("Model required"),
  make: Yup.string().required("Asset Make required"),
  lifespan: Yup.number()
    .positive("Lifespan must be more than 0")
    .integer()
    .required("Lifespan is required"),
  amount: Yup.number()
    .positive("Number must be more than 0")
    .integer()
    .required("Price required"),
  dep_factor: Yup.number()
    .positive("Depreciation factor must be more than 0")
    .integer()
    .required("Depreciation factor is required"),
  description: Yup.string("Enter Inventory Description"),
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
  vendor: Yup.mixed(),
  inventory_name: Yup.mixed(),
  department: Yup.mixed(),

  occupation: Yup.mixed().required("required"),
  message: Yup.string().required("message required"),
  terms: Yup.string()
    .test("terms", "you must agree to terms", (value) => value !== false)
    .required("required"),
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
  location_id: Yup.mixed().required("Select Branches"),
  department_id: Yup.mixed(),
  description: Yup.string().required("Select Description"),
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
  location_id: Yup.mixed().required("Select location"),
  manager_id: Yup.mixed().required("Select Department Head"),
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
  website: Yup.string(),
});

export const LocationSchema = Yup.object().shape({
  title: Yup.string().required("Location name is required"),
  city_id: Yup.mixed().required(" City is required"),
  ghana_post: Yup.string(),
});

export const UserSchema = Yup.object().shape({
  role_id: Yup.mixed().required(" Role is required"),
  password: Yup.string().required("Status is required"),
  last_name: Yup.string().required("Last name is required"),
  first_name: Yup.string().required("First name is required"),
  // status:Yup.string().required("Status is required"),
  middle_name: Yup.string(),
  department_id: Yup.mixed().required("Department name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  phone: Yup.string(),
  // custom_perm:Yup.array(),
  location_id: Yup.mixed().required("Location name is required"),
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
