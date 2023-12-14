bits 64

section .text
global strcmp

increment:
    inc rdi
    inc rsi

strcmp:
    mov bl, byte[rdi]   ; get first character of s1
    mov cl, byte[rsi]   ; get first character of s2

    cmp bl, 0           ; if current s1's char equal to zero end program
    je end
    cmp cl, 0           ; if current s2's char equal to zero end program
    je end
    cmp bl, cl          ; if current s1's char and current s2's char are equal increment and loop
    je increment

end:
    sub bl, cl          ; substract current s1's char and current s2's char
    movsx rax, bl
    ret