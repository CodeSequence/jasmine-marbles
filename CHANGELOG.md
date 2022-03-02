## [0.9.2](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/0.9.1...0.9.2) (2022-03-02)


### Bug Fixes

* remove equalityTested to avoid deprecation error with jasmine 4.0 ([#91](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/91)) ([06b849f](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/06b849fb25d147e0fb5e44d2003993ac51a20919)), closes [#89](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/89)



## [0.9.1](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/0.10.0-beta.0...0.9.1) (2021-09-28)


### Bug Fixes

* fix comparison for undefined properties and value matchers with Jasmine and Jest ([#87](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/87)) ([75f70c0](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/75f70c0faa37f0e84adcd450a17c0f13a627ad75))



# [0.10.0-beta.0](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/0.9.0...0.10.0-beta.0) (2021-07-01)


### Features

* add support for jest-circus ([#78](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/78)) ([bb9edf9](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/bb9edf9e7b0de7c6ca35da3995124d3180441dbd))



# [0.9.0](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/0.9.0-beta.0...0.9.0) (2021-06-16)



# [0.9.0-beta.0](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/0.8.1...0.9.0-beta.0) (2021-06-10)


### Features

* update RxJS dependencies to 7.x.x ([#67](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/67)) ([a7fb790](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/a7fb7904476f07199f3cc8fb9f1cac5a6133a8e8))


### BREAKING CHANGES

* Minimum dependencies for TypeScript and RxJS have been updated.

BEFORE:

Minimum dependencies:
TypeScript 4.1.x
RxJS 6.5.x

AFTER:

Minimum dependencies:
TypeScript 4.2.x
RxJS 7.x.x



## [0.8.1](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/0.8.0...0.8.1) (2021-02-18)


### Bug Fixes

* use lodash for internal isEqual check ([#65](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/65)) ([76bd638](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/76bd63898b7a3debe166a886c517c696bb91218d))



# [0.8.0](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/0.7.0...0.8.0) (2021-02-18)


### Code Refactoring

* remove usage of internal RxJS testing APIs ([#64](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/64)) ([fb4d603](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/fb4d603fc28e634c88d404221bb003059d7c9557)), closes [#39](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/39) [#44](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/44)


### BREAKING CHANGES

* RxJS minimum peer dependency has been updated

BEFORE:

RxJS minimum peer dependency is ^6.4.0

AFTER:

RxJS minimum peer dependency is ^6.5.3



# [0.7.0](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/v0.6.0...0.7.0) (2021-02-18)


### Bug Fixes

* remove warning for spec with no expectations ([#60](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/60)) ([aa28304](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/aa2830465a9e0a890c6a7a080a2e902ea7650144)), closes [#59](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/59)


### Features

* add better error reporting/tests/bug fixes ([#55](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/55)) ([a1fca8d](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/a1fca8d53505f5e74a79f48d02d9dbda46e4a5d1)), closes [#51](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/51) [#11](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/11)
* add proper types for matchers ([#58](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/58)) ([89bf847](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/89bf847d1ea8ecb2be172b452376262b0a4fb64a))



# [0.6.0](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/v0.5.0...v0.6.0) (2019-10-19)


### Features

* export environment setup function for jasmine and remove module exports check ([#41](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/41)) ([b57472a](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/b57472adeba487474203d2432862faf17920a835)), closes [#21](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/21) [#37](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/37) [#40](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/40)



# [0.5.0](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/v0.4.1...v0.5.0) (2019-04-15)


### chore

* update RxJS dependencies to 6.4.x ([d530594](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/d5305941a2651a37d4812a6026b7592bd5e6307d))


### Features

* add support for time progression syntax ([#38](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/38)) ([2f28eb3](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/2f28eb345fdda218dfaf42584922600161953a44)), closes [#30](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/30)


### BREAKING CHANGES

* Minimum dependency on RxJS is now 6.4.x



## [0.4.1](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/v0.4.0...v0.4.1) (2018-11-28)


### Bug Fixes

* revert use of browser entry point ([#35](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/35)) ([7a342b2](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/7a342b23142ce7609be544feda32affd602f1e4c))
* update types for jest.Matchers ([#36](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/36)) ([939332b](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/939332bca02af7c8c9b7e973f0a6670904d1abaa)), closes [#28](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/28)



# [0.4.0](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/v0.3.0...v0.4.0) (2018-09-13)


### Bug Fixes

* **lib:** Change script for main entry point ([#18](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/18)) ([f3f3f74](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/f3f3f74fd3a8ef08d3d80c1610a68cabd83d0984))


### Features

* Add typings support for jest namespace ([#29](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/29)) ([2bc640e](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/2bc640e73042d0417a6ca967081b9d78a799ebbc))
* trim marbles string ([#26](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/26)) ([6eb255b](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/6eb255b164021f32991532e490c9ac93a0b59b38)), closes [#3](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/3)



# [0.3.0](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/v0.2.0...v0.3.0) (2018-03-27)


### Features

* **deps:** Add support for RxJS 6 ([8085938](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/80859387191bf068fa8f5e08c888e9d8ec7616b8))
* **subscriptions:** add ability to test subscriptions ([f6f06ee](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/f6f06eeb24ed1c1a66ad39ce1318ab64e24ee6ee))


### BREAKING CHANGES

* **deps:** Update peer dependency and import paths to RxJS v6

BEFORE:
Depends on RxJS ~5.0.0

AFTER:
Depends on RxJS ~6.0.0



# [0.2.0](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/v0.1.0...v0.2.0) (2017-10-09)


### Features

* **matcher:** Update comparative output for observable matcher ([#7](https://github.com/synapse-wireless-labs/jasmine-marbles/issues/7)) ([31f6b76](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/31f6b76667d0ee66b53ab1941e5e128549f2ca3d))



# [0.1.0](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/v0.0.2...v0.1.0) (2017-07-18)



## [0.0.2](https://github.com/synapse-wireless-labs/jasmine-marbles/compare/v0.0.1...v0.0.2) (2017-02-27)


### Bug Fixes

* Release with CommonJS modules ([4e5358c](https://github.com/synapse-wireless-labs/jasmine-marbles/commit/4e5358c1344423fc4a2ae5537034dc6d23fd35e3))



## 0.0.1 (2017-02-27)



