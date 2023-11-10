export default function Footer() {
  const flexColSpTx = 'flex flex-col space-y-1 text-[16px] cursor-pointer'
  return (
    <footer className="border-t-[1px]">
      <div className="container sm:flex sm:justify-between py-5">
        <div className={`${flexColSpTx}`}>
          <p>Featured Blogs</p>
          <p>Most viewed</p>
          <p>Readers Choice</p>
        </div>

        <div className={`${flexColSpTx}`}>
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>

        <div className={`${flexColSpTx}`}>
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <p className="py-2 pb-6 text-center text-lg">
        All rights reserved Blog App 2023
      </p>
    </footer>
  );
}
