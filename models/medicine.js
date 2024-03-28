const { Schema, default: mongoose } = require("mongoose");

const medicSchema = new Schema(
  {
    pbf: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    faktur: String,
    type: String,
    buy: Number,
    sell: Number,
    description: String,
    user: String,
    stok: Number,
    ecer: Number,
    tgldatang: String,
    liability: Number,
    liadate: String,
    remark: String,
    jenis: String,
    namaobat: { type: mongoose.Schema.Types.ObjectId, ref: "Obat" },
    merk: Number,
    stokecer: Number,
    satuanecer: String,
    grosir: Number,
  },
  {
    timestamps: true,
  }
);

medicSchema.index({ namaobat: 1 });

const Medic = mongoose.model.Medic || mongoos.model("Medic", medicSchema);
export default Medic;
