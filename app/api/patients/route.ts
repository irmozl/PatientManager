import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("PatientManager");
    const patients = await db.collection("patients").find({}).toArray();

    return NextResponse.json(patients);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("PatientManager");

    await db.collection("patients").insertOne(body);

    return NextResponse.json({ message: "Patient added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add patient" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Patient ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("PatientManager");

    const result = await db.collection("patients").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete patient" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();
    
    if (!id) {
      return NextResponse.json({ error: "Patient ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("PatientManager");

    const result = await db.collection("patients").updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Patient updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update patient" }, { status: 500 });
  }
}