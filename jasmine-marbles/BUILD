package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_typescript//:defs.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "rollup_bundle", "npm_package")
load("@angular//:index.bzl", "ng_package")

ts_library(
    name = "jasmine-marbles",
    srcs = glob(
        [
            "*.ts",
            "**/src/**/*.ts",
        ],
        exclude = [
            "**/src/**/*.spec.ts"
        ],
    ),
    module_name = "jasmine-marbles",
    tsconfig = ":tsconfig-build.json",
    deps = [
        "@npm//rxjs",
        "@npm//lodash",
        "@npm//@types/jasmine",
        "@npm//@types/lodash",
        "@npm//@types/node",
    ],
)

rollup_bundle(
    name = "bundle",
    node_modules = "@npm//:node_modules",
    entry_point = "jasmine-marbles/index.js",
    globals = {"rxjs": "Rx","rxjs/testing": "Rx","lodash": "_"},
    deps = glob(["**/*.externs.js"]) + [
        ":jasmine-marbles",
    ],
)

ng_package(
    name = "npm_package",
    srcs = glob(["**/*.externs.js"]) + [
        ":package.json",
        ":README.md",
        ":LICENSE",
    ],
    entry_point = "jasmine-marbles/index.js",
    globals = {"rxjs": "Rx","rxjs/testing": "Rx","lodash": "_"},
    deps = [
        ":jasmine-marbles",
    ],
)

# npm_package(
#     name = "npm_package",
#     srcs = [
#         ":package.json",
#         ":README.md",
#     ],
#     deps = [
#         ":jasmine-marbles",
#         ":bundle"
#     ],
# )
