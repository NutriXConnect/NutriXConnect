import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileOrders } from "../../../middleware/userMiddleware";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import { resetPagination } from "../../../redux/slices/PaginationSlice";

const OrdersTab = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.user);
  const [statusFilter, setStatusFilter] = useState("all");

  const { currentPage, totalItems, pageSize } = useSelector(
    (state) => state.pagination
  );

  useEffect(() => {
    dispatch(getUserProfileOrders(currentPage, pageSize));

    return () => {
      dispatch(resetPagination());
    };
  }, [currentPage, pageSize]);

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders?.filter((order) => order.status === statusFilter);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Orders</h2>
        <select
          className="border rounded-lg px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-2">{order._id}</td>
                <td className="p-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2 text-right">₹{order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
};

export default OrdersTab;
