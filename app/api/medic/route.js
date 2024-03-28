import startDb from "../../../lib/db";
import Medic from "../../../models/medicine";
import { NextResponse } from "next/server";

//middleware

// export async function authenticateToken(request) {
//   const authHeader = request.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return { authenticated: false };
//   }

//   try {
//     const decoded = jwt.verify(token, "your_secret_key");
//     return { authenticated: true, userId: decoded.userId }; // Dapat mengembalikan data tambahan jika diperlukan
//   } catch (error) {
//     return { authenticated: false };
//   }
// }

export async function POST(request) {
  try {
    const {
      pbfId,
      faktur,
      type,
      buy,
      sell,
      description,
      user,
      stok,
      ecer,
      tgldatang,
      liability,
      liadate,
      remark,
      jenis,
      namaobatId,
      merk,
      stokecer,
      satuanecer,
      grosir,
    } = await request.json();
    console.log("Received data from the front-end:");

    await startDb();
    await Medic.create({
      pbf: pbfId,
      faktur,
      type,
      buy,
      sell,
      description,
      user,
      stok,
      ecer,
      tgldatang,
      liability,
      liadate,
      remark,
      jenis,
      namaobat: namaobatId,
      merk,
      stokecer,
      satuanecer,
      grosir,
    });

    return NextResponse.json(
      { message: "Data Obat telah di buat" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create data:", error);
    return NextResponse.json(
      { error: "Failed to create data" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await startDb();
  try {
    const medics = await Medic.find().populate("pbf").populate("namaobat");

    return NextResponse.json({ medics });
  } catch (error) {
    console.error({ message: "Internal server error" });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await startDb();
  await Medic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Data obat dihapus" }, { status: 200 });
}
