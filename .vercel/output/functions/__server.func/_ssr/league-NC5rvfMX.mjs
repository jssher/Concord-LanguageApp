import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as parseName, c as suggestHandle, i as parseHandle, r as leagueFor, t as LEAGUES } from "./score-Dwg2HOzd.mjs";
import { i as signOut, r as signIn } from "./client-MBVlHALp.mjs";
import { a as Shell, c as connectTo, h as useStanding, p as saveName, u as getBoard } from "./shell-WOgA0OuT.mjs";
import { a as hasGateSessionMarker, t as GROK_PROVIDERS } from "./server-CbrRGjMx.mjs";
import { n as useCurrentUserState, t as useCurrentUser } from "./use-current-user-DHhD3EMN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/league-NC5rvfMX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function LeaguePage() {
	const session = useCurrentUserState();
	const account = useCurrentUser();
	const standing = useStanding();
	const [board, setBoard] = (0, import_react.useState)(null);
	const [boardError, setBoardError] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const mine = standing.mine;
	const mineLeague = mine ? leagueFor(mine.score).id : "footpath";
	const [picked, setPicked] = (0, import_react.useState)(null);
	const selected = picked ?? mineLeague;
	const league = LEAGUES.find((item) => item.id === selected) ?? LEAGUES[0];
	const rows = (board ?? []).filter((row) => leagueFor(row.score).id === selected);
	(0, import_react.useEffect)(() => {
		let live = true;
		getBoard().then((next) => {
			if (live) setBoard(next);
		}).catch(() => {
			if (live) setBoardError(true);
		});
		return () => {
			live = false;
		};
	}, [
		mine?.handle,
		mine?.score,
		mine?.held
	]);
	const pending = session.isPending || standing.status === "loading";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-widest text-accent uppercase",
					children: "Leagues"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-4xl",
					children: "How much you learn, and still remember."
				})] }), session.user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) : null]
			}),
			pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-36 animate-pulse rounded-2xl bg-chip" }) : !session.user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl",
						children: "Sign in to take a name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "A readable name is linked to a short handle. People open that profile and can connect with you. What you already studied on this device is counted once you join."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-col gap-2 sm:flex-row",
						children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => signIn(provider.providerId, { callbackURL: "/league" }),
							className: "inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-paper px-4 text-sm",
							children: ["Continue with ", provider.label]
						}, provider.providerId))
					})
				]
			}) : !mine || editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameForm, {
				initialName: mine?.name || account?.displayName || "",
				initialHandle: mine?.handle || "",
				editing: Boolean(mine),
				onCancel: mine ? () => setEditing(false) : void 0,
				onSaved: () => setEditing(false)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YourStanding, { onEdit: () => setEditing(true) }),
			standing.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-accent",
				children: "The league could not be loaded. Study still works on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-2",
					children: LEAGUES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPicked(item.id),
						className: `inline-flex min-h-10 shrink-0 items-center rounded-full px-3 text-sm ${item.id === selected ? "bg-ink text-paper" : "bg-chip text-ink"}`,
						children: item.name
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						league.blurb,
						" From ",
						league.min.toLocaleString(),
						" points",
						league.next ? `, and ${league.next.toLocaleString()} reaches the next league.` : "."
					]
				}),
				boardError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-accent",
					children: "The board did not load."
				}),
				!board && !boardError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Loading the board."
				}),
				board && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"No one is in ",
						league.name,
						" yet."
					]
				}),
				rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-2 divide-y divide-line border-y border-line",
					children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-6 shrink-0 tabular-nums text-muted",
								children: index + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/people/$handle",
									params: { handle: row.handle },
									className: "block truncate font-display text-2xl",
									children: row.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm text-muted",
									children: [
										row.score.toLocaleString(),
										" points · ",
										row.held.toLocaleString(),
										" still remembered"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectButton, { handle: row.handle })
						]
					}, row.handle))
				})
			] })
		]
	}) });
}
function YourStanding({ onEdit }) {
	const mine = useStanding().mine;
	if (!mine) return null;
	const league = leagueFor(mine.score);
	const left = league.next === null ? null : Math.max(0, league.next - mine.score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-widest text-muted uppercase",
						children: league.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/people/$handle",
							params: { handle: mine.handle },
							children: mine.name
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["/", mine.handle]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onEdit,
					className: "text-sm text-muted underline-offset-4 hover:underline",
					children: "Edit name"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					mine.streak > 0 ? `${mine.streak} ${mine.streak === 1 ? "day" : "days"} in a row. ` : "",
					mine.weekPoints.toLocaleString(),
					" this week.",
					left !== null ? ` ${left.toLocaleString()} points to the next league.` : " This is the top league."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Score",
						value: mine.score.toLocaleString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Learned",
						value: mine.learned.toLocaleString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Remembered",
						value: mine.held.toLocaleString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Firm",
						value: mine.firm.toLocaleString()
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "A new word is 10 points. Remembering it again is 5, until you know it well. A miss keeps the word out of “still remembered” until you get it again. The same well-known word scores at most once a day."
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-paper px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-3xl tabular-nums",
			children: value
		})]
	});
}
function NameForm({ initialName, initialHandle, editing, onCancel, onSaved }) {
	const suggested = parseName(initialName).ok ? initialName.trim().replace(/\s+/g, " ") : "";
	const [name, setName] = (0, import_react.useState)(initialHandle ? initialName : suggested);
	const [handle, setHandle] = (0, import_react.useState)(initialHandle || suggestHandle(suggested));
	const [touched, setTouched] = (0, import_react.useState)(Boolean(initialHandle));
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(event) {
		event.preventDefault();
		const parsedName = parseName(name);
		if (!parsedName.ok) {
			setError(parsedName.error);
			return;
		}
		const parsedHandle = parseHandle(handle);
		if (!parsedHandle.ok) {
			setError(parsedHandle.error);
			return;
		}
		setBusy(true);
		setError("");
		try {
			const result = await saveName(parsedName.value, parsedHandle.value);
			if (!result.ok) setError(result.error);
			else onSaved();
		} catch (err) {
			setError(err instanceof Error && err.message === "Unauthorized" ? "Sign in to keep this name." : "That name could not be saved.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "rounded-2xl border border-line bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: editing ? "Edit your name" : "What should people call you?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Use a real name. Nothing rude, and no codes. The link under it is how someone opens your profile."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mt-4 block text-sm",
				htmlFor: "learner-name",
				children: "Name"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "learner-name",
				value: name,
				onChange: (event) => {
					const value = event.target.value;
					setName(value);
					if (!touched) setHandle(suggestHandle(value));
				},
				autoComplete: "name",
				maxLength: 40,
				className: "mt-1 min-h-11 w-full rounded-full border border-line bg-paper px-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mt-3 block text-sm",
				htmlFor: "learner-handle",
				children: "Link"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "learner-handle",
				value: handle,
				onChange: (event) => {
					setTouched(true);
					setHandle(event.target.value.toLowerCase());
				},
				autoCapitalize: "none",
				autoCorrect: "off",
				spellCheck: false,
				maxLength: 24,
				placeholder: "mina-okonkwo",
				className: "mt-1 min-h-11 w-full rounded-full border border-line bg-paper px-3"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-accent",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy,
					className: "inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-sm text-accent-ink disabled:opacity-50",
					children: busy ? "Saving" : editing ? "Save name" : "Join the league"
				}), onCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onCancel,
					className: "inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm",
					children: "Cancel"
				})]
			})
		]
	});
}
function ConnectButton({ handle }) {
	const standing = useStanding();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const mine = standing.mine;
	if (!mine || mine.handle === handle) return null;
	const on = mine.following.includes(handle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex shrink-0 flex-col items-end gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: busy,
			onClick: () => {
				setBusy(true);
				setError("");
				connectTo(handle, !on).then((result) => {
					if (!result.ok) setError(result.error);
				}).catch(() => setError("Could not connect.")).finally(() => setBusy(false));
			},
			className: `inline-flex min-h-10 items-center rounded-full border px-3 text-sm ${on ? "border-moss bg-moss text-moss-ink" : "border-line bg-paper"}`,
			children: busy ? "Saving" : on ? "Connected" : "Connect"
		}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "max-w-32 text-right text-xs text-accent",
			children: error
		})]
	});
}
//#endregion
export { LeaguePage as component };
