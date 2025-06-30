export default function Footer() {
  return (
    <footer className="bg-gray-800 text-center py-4 mt-10 border-t">
      <p className="text-sm text-white">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </p>
    </footer>
  );
}
