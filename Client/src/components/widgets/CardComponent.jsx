const DashboardCard = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
      <div className="bg-[#1275A4] text-white p-3 rounded-full text-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-semibold">{value}</h3>
      </div>
    </div>
  );

export default DashboardCard