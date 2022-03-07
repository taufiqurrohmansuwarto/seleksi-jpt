import { nanoid } from "nanoid";
import prisma from "../lib/prisma";
import notification from "../utils/notification";

const documentProperties = [
  "surat_lamaran",
  "drh",
  "ktp",
  "foto",
  "sk_pangkat",
  "sk_pengangkatan_jabatan_terakhir",
  "sk_pengangkatan_pertama_kali",
  "ijazah",
  "sttp",
  "skp",
  "lhkpn",
  "spt",
  "surat_rekomendasi",
  "surat_pernyataan_tidak_pidana",
  "surat_pernyataan_tidak_dijatuhi_hukdis",
  "surat_keterangan_pakta_integritas",
  "surat_keterangan_jasmani_rohani",
  "surat_keterangan_bebas_napza",
];

const create = async (req, res) => {
  const { user } = req.currentUser;
  const currentId = `BKD-${nanoid(5)}`;

  try {
    await prisma.profiles.create({
      data: {
        user_id: user?.id,
        alamat_email: user?.email,
        nomer_peserta: currentId,
        documents: {
          create: {},
        },
      },
    });
    res.json({ code: 200, message: "created" });
  } catch (error) {
    console.log(error);
  }
};

const get = async (req, res) => {
  const { user } = req.currentUser;
  try {
    let hasil;
    const result = await prisma.profiles.findUnique({
      where: {
        user_id: user?.id,
      },
      include: {
        documents: true,
      },
    });

    if (!result) {
      hasil = result;
    } else {
      const userDocument = result?.documents;
      const currentData = {
        surat_lamaran: userDocument["surat_lamaran"]
          ? [
              {
                id: userDocument["surat_lamaran"],
                name: userDocument["surat_lamaran"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["surat_lamaran"]}`,
              },
            ]
          : [],
        drh: userDocument["drh"]
          ? [
              {
                id: userDocument["drh"],
                name: userDocument["drh"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["drh"]}`,
              },
            ]
          : [],
        ktp: userDocument["ktp"]
          ? [
              {
                id: userDocument["ktp"],
                name: userDocument["ktp"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["ktp"]}`,
              },
            ]
          : [],
        foto: userDocument["foto"]
          ? [
              {
                id: userDocument["foto"],
                name: userDocument["foto"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["foto"]}`,
              },
            ]
          : [],
        sk_pangkat: userDocument["sk_pangkat"]
          ? [
              {
                id: userDocument["sk_pangkat"],
                name: userDocument["sk_pangkat"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["sk_pangkat"]}`,
              },
            ]
          : [],
        sk_pengangkatan_jabatan_terakhir: userDocument[
          "sk_pengangkatan_jabatan_terakhir"
        ]
          ? [
              {
                id: userDocument["sk_pengangkatan_jabatan_terakhir"],
                name: userDocument["sk_pengangkatan_jabatan_terakhir"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["sk_pengangkatan_jabatan_terakhir"]}`,
              },
            ]
          : [],
        sk_pengangkatan_pertama_kali: userDocument[
          "sk_pengangkatan_pertama_kali"
        ]
          ? [
              {
                id: userDocument["sk_pengangkatan_pertama_kali"],
                name: userDocument["sk_pengangkatan_pertama_kali"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["sk_pengangkatan_pertama_kali"]}`,
              },
            ]
          : [],
        ijazah: userDocument["ijazah"]
          ? [
              {
                id: userDocument["ijazah"],
                name: userDocument["ijazah"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["ijazah"]}`,
              },
            ]
          : [],
        sttp: userDocument["sttp"]
          ? [
              {
                id: userDocument["sttp"],
                name: userDocument["sttp"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["sttp"]}`,
              },
            ]
          : [],
        skp: userDocument["skp"]
          ? [
              {
                id: userDocument["skp"],
                name: userDocument["skp"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["skp"]}`,
              },
            ]
          : [],
        lhkpn: userDocument["lhkpn"]
          ? [
              {
                id: userDocument["lhkpn"],
                name: userDocument["lhkpn"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["lhkpn"]}`,
              },
            ]
          : [],
        spt: userDocument["spt"]
          ? [
              {
                id: userDocument["spt"],
                name: userDocument["spt"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["spt"]}`,
              },
            ]
          : [],
        surat_rekomendasi: userDocument["surat_rekomendasi"]
          ? [
              {
                id: userDocument["surat_rekomendasi"],
                name: userDocument["surat_rekomendasi"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["surat_rekomendasi"]}`,
              },
            ]
          : [],
        surat_pernyataan_tidak_pidana: userDocument[
          "surat_pernyataan_tidak_pidana"
        ]
          ? [
              {
                id: userDocument["surat_pernyataan_tidak_pidana"],
                name: userDocument["surat_pernyataan_tidak_pidana"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["surat_pernyataan_tidak_pidana"]}`,
              },
            ]
          : [],
        surat_pernyataan_tidak_dijatuhi_hukdis: userDocument[
          "surat_pernyataan_tidak_dijatuhi_hukdis"
        ]
          ? [
              {
                id: userDocument["surat_pernyataan_tidak_dijatuhi_hukdis"],
                name: userDocument["surat_pernyataan_tidak_dijatuhi_hukdis"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["surat_pernyataan_tidak_dijatuhi_hukdis"]}`,
              },
            ]
          : [],
        surat_keterangan_pakta_integritas: userDocument[
          "surat_keterangan_pakta_integritas"
        ]
          ? [
              {
                id: userDocument["surat_keterangan_pakta_integritas"],
                name: userDocument["surat_keterangan_pakta_integritas"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["surat_keterangan_pakta_integritas"]}`,
              },
            ]
          : [],
        surat_keterangan_jasmani_rohani: userDocument[
          "surat_keterangan_jasmani_rohani"
        ]
          ? [
              {
                id: userDocument["surat_keterangan_jasmani_rohani"],
                name: userDocument["surat_keterangan_jasmani_rohani"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["surat_keterangan_jasmani_rohani"]}`,
              },
            ]
          : [],
        surat_keterangan_bebas_napza: userDocument[
          "surat_keterangan_bebas_napza"
        ]
          ? [
              {
                id: userDocument["surat_keterangan_bebas_napza"],
                name: userDocument["surat_keterangan_bebas_napza"],
                status: "done",
                url: `${process.env.FILE_URL}/${userDocument["surat_keterangan_bebas_napza"]}`,
              },
            ]
          : [],
      };

      hasil = { ...result, documents: { ...userDocument, ...currentData } };
    }

    res.json(hasil);
  } catch (error) {
    console.log(error);
  }
};

const submit = async (req, res) => {
  const { user } = req.currentUser;
  try {
    const result = await prisma.profiles.findUnique({
      where: {
        user_id: user?.id,
      },
      include: {
        documents: true,
      },
    });

    const documentProperties = [
      "surat_lamaran",
      "drh",
      "ktp",
      "foto",
      "sk_pangkat",
      "sk_pengangkatan_jabatan_terakhir",
      "sk_pengangkatan_pertama_kali",
      "ijazah",
      "sttp",
      "skp",
      "lhkpn",
      "spt",
      "surat_rekomendasi",
      "surat_pernyataan_tidak_pidana",
      "surat_pernyataan_tidak_dijatuhi_hukdis",
      "surat_keterangan_pakta_integritas",
      "surat_keterangan_jasmani_rohani",
      "surat_keterangan_bebas_napza",
    ];

    const profileProperties = [
      "nama_gelar",
      "nip",
      "tempat_lahir",
      "tanggal_lahir",
      "alamat_email",
      "no_hp",
      "pendidikan_terakhir",
      "tahun_lulus",
      "gol_pangkat",
      "tmt_pangkat",
      "jabatan_terakhir",
      "eselon_terakhir",
      "tmt_jab_terakhir",
      "instansi",
      // "tmt_pengangkatan_pertama",
    ];

    if (!result) {
      res
        .status(403)
        .json({ code: 403, message: "User belum melakukan input" });
    } else {
      const dataProfile = profileProperties?.map((profile) => ({
        current: result[profile],
        [profile]: result[profile],
      }));
      const dataDocument = documentProperties?.map((document) => ({
        current: result?.documents?.[document],
      }));

      const isCompletedProfile = dataProfile?.every((d) => !!d?.current);
      const isCompletedDocument = dataDocument?.every((x) => !!x?.current);

      if (isCompletedDocument && isCompletedProfile) {
        await prisma.profiles.update({
          data: {
            is_submit: true,
          },
          where: {
            user_id: user?.id,
          },
        });
        res.status(200).json({ code: 200, message: "sukses" });
      } else {
        res.status(403).json({
          code: 403,
          message: "Profile atau dokumen belum terisi penu",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  const { user } = req.currentUser;
  try {
    const { body } = req;
    await prisma.profiles.update({
      data: body,
      where: {
        user_id: user?.id,
      },
    });
    res.json({ code: 200, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

const report = async (req, res) => {
  try {
    await notification.emailNotification(
      "taufiqurrohman.suwarto@gmail.com",
      "halo iput taufiqurrohman suwarto"
    );
    res.status(200).json({ code: 200 });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400 });
  }
};

export default {
  create,
  submit,
  get,
  update,
  report,
};
