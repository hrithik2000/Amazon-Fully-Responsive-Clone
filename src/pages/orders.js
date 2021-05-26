<<<<<<< HEAD
import { getSession, useSession } from "next-auth/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import db from "../../firebase";
import firebase from "firebase";
import moment from "moment";
import Order from "../components/Order";

function Orders({ orders }) {
  const [session] = useSession();

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} orders</h2>
        ) : (
          <h2>Please sign in to view orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, images, timestamp, items }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
      <Footer />
=======
import Currency from "react-currency-formatter";
import moment from "moment";
import { groupBy } from "lodash";

function Order({ id, amount, amountShipping, images, timestamp, items }) {
  const groupedImages = Object.values(groupBy(images));

  return (
    <div className="relative border rounded-md">
      <div className="block sm:flex items-center sm:space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div className="mb-3 sm:mb-0">
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("MM/DD/YYYY")}</p>
        </div>

        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <span className="font-bold">
              <Currency quantity={amount} currency="EUR" />
            </span>{" "}
            (Including <Currency quantity={amountShipping} currency="EUR" /> for
            "<span className="italic">Next Day Delivery</span>")
          </p>
        </div>

        <p className="absolute top-3 right-3 sm:static text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.reduce((total, item) => total + item.quantity, 0)} items
        </p>

        <p className="w-100 sm:absolute top-3 right-2 sm:w-72 truncate text-xs whitespace-nowrap">
          ORDER #{id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {groupedImages.map((group) => (
            <div className="relative">
              <img
                src={group[0]}
                alt=""
                className="h-20 object-contain sm:h-32"
              />
              {group.length > 1 && (
                <div className="absolute bottom-2 right-2 p-1 rounded shadow font-bold bg-yellow-400 text-black text-2xl text-center">
                  &times; {group.length}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
>>>>>>> edc122ad62fa08fc7d11849dcb13b1c280f12200
    </div>
  );
}

<<<<<<< HEAD
export default Orders;
export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await db
    .collection("AMAZON_users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  //stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
=======
export default Order;
>>>>>>> edc122ad62fa08fc7d11849dcb13b1c280f12200
