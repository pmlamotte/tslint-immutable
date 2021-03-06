"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var noThisKeywordWalker = new NoThisWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(noThisKeywordWalker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = "Unexpected this, use functions not classes.";
exports.Rule = Rule;
var NoThisWalker = (function (_super) {
    __extends(NoThisWalker, _super);
    function NoThisWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoThisWalker.prototype.visitNode = function (node) {
        if (node && node.kind === ts.SyntaxKind.ThisKeyword) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitNode.call(this, node);
    };
    return NoThisWalker;
}(Lint.RuleWalker));
