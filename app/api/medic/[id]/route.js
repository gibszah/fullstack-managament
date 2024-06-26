import startDb from "../../../../lib/db";
import Medic from "../../../../models/medicine";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newType: type,
    newBuy: buy,
    newSell: sell,
    newDescription: description,
    newStok: stok,
    newEcer: ecer,
    newGrosir: grosir,
    eta: tgldatang,
    newliability: liability,
    newliadate: liadate,
    newremark: remark,
    newjenis: jenis,
    newNamaObat: namaobat,
    newmerk: merk,
    newfaktur: faktur,
    pbfName: pbf,
    newStokEcer: stokecer,
    newSatuan: satuanecer,
  } = await request.json();
  await startDb();
  await Medic.findByIdAndUpdate(id, {
    pbf,
    faktur,
    type,
    buy,
    sell,
    description,
    stok,
    ecer,
    tgldatang,
    liability,
    liadate,
    remark,
    jenis,
    namaobat,
    merk,
    stokecer,
    satuanecer,
    grosir,
  });
  return NextResponse.json(
    { message: "Data obat diperbarui" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await startDb();
  const medic = await Medic.findOne({ _id: id });
  return NextResponse.json({ medic }, { status: 200 });
}
