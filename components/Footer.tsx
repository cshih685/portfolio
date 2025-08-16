const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Chieh Shih</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Experienced Full Stack Engineer driven by a passion for building cutting-edge technology solutions that solve real-world problems and create meaningful business impact.
          Always open to new opportunities and collaborations.
          </p>
          <div className="border-t border-slate-700 pt-6">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Chieh Shih. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;