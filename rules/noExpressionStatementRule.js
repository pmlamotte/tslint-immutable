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
        var noExpressionStatementWalker = new NoExpressionStatementWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(noExpressionStatementWalker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = "Using expressions to cause side-effects not allowed.";
exports.Rule = Rule;
var NoExpressionStatementWalker = (function (_super) {
    __extends(NoExpressionStatementWalker, _super);
    function NoExpressionStatementWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoExpressionStatementWalker.prototype.visitNode = function (node) {
        if (node && node.kind === ts.SyntaxKind.ExpressionStatement) {
            var children = node.getChildren();
            if (children.every(function (n) { return n.kind !== ts.SyntaxKind.YieldExpression; })) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    return NoExpressionStatementWalker;
}(Lint.RuleWalker));
