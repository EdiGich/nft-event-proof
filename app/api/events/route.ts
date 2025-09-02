import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const eventsFilePath = path.join(process.cwd(), 'events.json');

function readEvents() {
  try {
    const data = fs.readFileSync(eventsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeEvents(events) {
  fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2));
}

export async function GET() {
  const events = readEvents();
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const events = readEvents();
  const newEvent = await req.json();
  newEvent.id = Date.now();
  events.push(newEvent);
  writeEvents(events);
  return NextResponse.json(newEvent, { status: 201 });
}
