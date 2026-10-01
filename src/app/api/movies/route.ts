import { allRequiredBoundariesRendered } from "next/dist/server/app-render/instant-validation/boundary-tracking";
import { NextResponse } from "next/server";
const SORTS = {
  popular: "popularity.desc",
  newest: "primary_release_date.desc",
  oldest: "primary_release_date.asc",
  toprated: "vote_average.desc",
};
const MAX_PAGE = 20;
const Today = ()=> new Date().toISOString().split("T")[0];
const bad = (error: string) => NextResponse.json({ error }, { status: 400 });