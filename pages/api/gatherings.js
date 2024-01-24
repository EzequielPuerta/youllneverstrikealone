import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db(process.env.NEXT_PUBLIC_DB);

       const gatherings = await db
           .collection("gatherings")
           .find({})
           .sort({ ig_name: 1 })
           .limit(100)
           .toArray();

       res.json(gatherings);
   } catch (e) {
       console.error(e);
   }
};
