(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/Projects/Truedocs/truedocs/components/ui/progressive-blur.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GRADIENT_ANGLES",
    ()=>GRADIENT_ANGLES,
    "ProgressiveBlur",
    ()=>ProgressiveBlur
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$Truedocs$2f$truedocs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/Truedocs/truedocs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$Truedocs$2f$truedocs$2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/Truedocs/truedocs/lib/cn.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$Truedocs$2f$truedocs$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/Truedocs/truedocs/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
;
const GRADIENT_ANGLES = {
    top: 0,
    right: 90,
    bottom: 180,
    left: 270
};
function ProgressiveBlur(param) {
    let { direction = "bottom", blurLayers = 8, className, blurIntensity = 0.25, ...props } = param;
    const layers = Math.max(blurLayers, 2);
    const segmentSize = 1 / (blurLayers + 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$Truedocs$2f$truedocs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$Truedocs$2f$truedocs$2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className),
        children: Array.from({
            length: layers
        }).map((_, index)=>{
            const angle = GRADIENT_ANGLES[direction];
            const gradientStops = [
                index * segmentSize,
                (index + 1) * segmentSize,
                (index + 2) * segmentSize,
                (index + 3) * segmentSize
            ].map((pos, posIndex)=>"rgba(255, 255, 255, ".concat(posIndex === 1 || posIndex === 2 ? 1 : 0, ") ").concat(pos * 100, "%"));
            const gradient = "linear-gradient(".concat(angle, "deg, ").concat(gradientStops.join(", "), ")");
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$Truedocs$2f$truedocs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$Truedocs$2f$truedocs$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "pointer-events-none absolute inset-0 rounded-[inherit]",
                style: {
                    maskImage: gradient,
                    WebkitMaskImage: gradient,
                    backdropFilter: "blur(".concat(index * blurIntensity, "px)")
                },
                ...props
            }, index, false, {
                fileName: "[project]/Documents/Projects/Truedocs/truedocs/components/ui/progressive-blur.tsx",
                lineNumber: 48,
                columnNumber: 6
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/Documents/Projects/Truedocs/truedocs/components/ui/progressive-blur.tsx",
        lineNumber: 30,
        columnNumber: 3
    }, this);
}
_c = ProgressiveBlur;
var _c;
__turbopack_context__.k.register(_c, "ProgressiveBlur");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Projects/Truedocs/truedocs/components/ui/progressive-blur.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/Projects/Truedocs/truedocs/components/ui/progressive-blur.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Documents_Projects_Truedocs_truedocs_components_ui_progressive-blur_tsx_3ef95d4f._.js.map