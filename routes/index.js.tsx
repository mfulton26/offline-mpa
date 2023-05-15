/// <reference lib="dom" />

import React from "react";
import { hydrateRoot } from "react-dom/client";

import HomePage from "./index.tsx";

hydrateRoot(document, <HomePage />);
