/** Built-in Grok text-to-speech voices. Ids match the Voice API. */
export type VoiceChoice = {
  id: string;
  name: string;
  gender: "female" | "male";
};

export const VOICES: VoiceChoice[] = [
  { id: "ara", name: "Ara", gender: "female" },
  { id: "aurora", name: "Aurora", gender: "female" },
  { id: "carina", name: "Carina", gender: "female" },
  { id: "celeste", name: "Celeste", gender: "female" },
  { id: "eve", name: "Eve", gender: "female" },
  { id: "iris", name: "Iris", gender: "female" },
  { id: "liora", name: "Liora", gender: "female" },
  { id: "luna", name: "Luna", gender: "female" },
  { id: "ursa", name: "Ursa", gender: "female" },
  { id: "altair", name: "Altair", gender: "male" },
  { id: "atlas", name: "Atlas", gender: "male" },
  { id: "castor", name: "Castor", gender: "male" },
  { id: "cosmo", name: "Cosmo", gender: "male" },
  { id: "helios", name: "Helios", gender: "male" },
  { id: "helix", name: "Helix", gender: "male" },
  { id: "kepler", name: "Kepler", gender: "male" },
  { id: "leo", name: "Leo", gender: "male" },
  { id: "lumen", name: "Lumen", gender: "male" },
  { id: "lux", name: "Lux", gender: "male" },
  { id: "naksh", name: "Naksh", gender: "male" },
  { id: "orion", name: "Orion", gender: "male" },
  { id: "perseus", name: "Perseus", gender: "male" },
  { id: "rex", name: "Rex", gender: "male" },
  { id: "rigel", name: "Rigel", gender: "male" },
  { id: "sal", name: "Sal", gender: "male" },
  { id: "sirius", name: "Sirius", gender: "male" },
  { id: "zagan", name: "Zagan", gender: "male" },
  { id: "zenith", name: "Zenith", gender: "male" },
];

export const DEFAULT_VOICE = "eve";

/** The speech engine already installed on the phone or computer. */
export const DEVICE_VOICE = "device";

export function voiceById(id: string): VoiceChoice | undefined {
  return VOICES.find((voice) => voice.id === id);
}
