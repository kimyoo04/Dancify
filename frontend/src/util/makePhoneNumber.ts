export default function makePhoneNumber(value: string) {
  const numericValue = value.replace(/\D/g, "");
  return numericValue.slice(0, 12);
}
