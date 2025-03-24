import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/home/homeLayout.tsx", [
        index("routes/home/home.tsx")
    ]),
    layout("routes/currentRate/currentRateLayout.tsx", [
        route("/current-rate", "routes/currentRate/currentRate.tsx")
    ]),
    layout("routes/graph/graphLayout.tsx", [
        route("/graph", "routes/graph/graph.tsx")
    ])
] satisfies RouteConfig;
