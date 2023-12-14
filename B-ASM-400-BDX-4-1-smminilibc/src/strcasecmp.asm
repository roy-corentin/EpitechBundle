bits 64

section .text
global strcasecmp

increment:
    inc rdi
    inc rsi

strcasecmp:
    mov bl, byte[rdi]   ; get first character of s1
    mov cl, byte[rsi]   ; get first character of s2

    cmp bl, 0           ; if current s1's char equal to zero end program
    je end
    cmp cl, 0           ; if current s2's char equal to zero end program
    je end
    mov r15b, bl
    add r15b, 32        ; r15b = bl + 32 (bl MAJ)
    mov r14b, bl
    sub r14b, 32        ; r14b = bl - 32 (bl MIN)
    mov r13b, cl
    add r13b, 32        ; r13b = cl + 32 (cl MAJ)
    mov r12b, cl
    sub r12b, 32        ; r12b = cl - 32 (cl MIN)
    cmp bl, cl          ; if current s1's char and current s2's in MIN char are equal increment and loop
    je increment
    cmp bl, r13b        ; if current s1's char and current s2's in MAJ char are equal increment and loop
    je increment
    cmp bl, r12b        ; if current s1's char and current s2's in MIN char are equal increment and loop
    je increment
    cmp cl, r15b        ; if current s2's char and current s1's in MAJ char are equal increment and loop
    je increment
    cmp cl, r14b        ; if current s2's char and current s1's in MIN char are equal increment and loop
    je increment

end:
    sub bl, cl          ; substract current s1's char and current s2's char
    movsx rax, bl
    ret