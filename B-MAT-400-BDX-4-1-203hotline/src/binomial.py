from src.display import display_binomial
from typing import List


def fact(n: int) -> int:
    result: int = 1
    facts: List[int] = [x for x in range(1, n + 1)]
    for fact in facts:
        result *= fact
    return result


def binomial(n: int, k: int) -> float:
    return (fact(n)) / (fact(k) * fact(n - k))


def binomial_int(n: int, k: int) -> int:
    return (fact(n)) // (fact(k) * fact(n - k))


def binomial_computation(n: int, k: int) -> int:
    display_binomial(n, k, binomial_int(n, k))
    return 0
